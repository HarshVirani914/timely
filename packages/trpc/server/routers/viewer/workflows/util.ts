import type { Workflow } from "@prisma/client";
import { isSMSOrWhatsappAction } from "@timely/ee/workflows/lib/actionHelperFunctions";
import { SMS_REMINDER_NUMBER_FIELD } from "@timely/features/bookings/lib/SystemField";
import {
  getSmsReminderNumberField,
  getSmsReminderNumberSource,
} from "@timely/features/bookings/lib/getBookingFields";
import { removeBookingField, upsertBookingField } from "@timely/features/eventtypes/lib/bookingFieldsManager";
import { SENDER_ID, SENDER_NAME } from "@timely/lib/constants";
import type { PrismaClient } from "@timely/prisma";
import type { WorkflowStep } from "@timely/prisma/client";
import { MembershipRole } from "@timely/prisma/enums";

export function getSender(
  step: Pick<WorkflowStep, "action" | "sender"> & { senderName: string | null | undefined }
) {
  return isSMSOrWhatsappAction(step.action) ? step.sender || SENDER_ID : step.senderName || SENDER_NAME;
}

export async function isAuthorized(
  workflow: Pick<Workflow, "id" | "teamId" | "userId"> | null,
  prisma: PrismaClient,
  currentUserId: number,
  readOnly?: boolean
) {
  if (!workflow) {
    return false;
  }

  if (!readOnly) {
    const userWorkflow = await prisma.workflow.findFirst({
      where: {
        id: workflow.id,
        OR: [
          { userId: currentUserId },
          {
            team: {
              members: {
                some: {
                  userId: currentUserId,
                  accepted: true,
                },
              },
            },
          },
        ],
      },
    });
    if (userWorkflow) return true;
  }

  const userWorkflow = await prisma.workflow.findFirst({
    where: {
      id: workflow.id,
      OR: [
        { userId: currentUserId },
        {
          team: {
            members: {
              some: {
                userId: currentUserId,
                accepted: true,
                NOT: {
                  role: MembershipRole.MEMBER,
                },
              },
            },
          },
        },
      ],
    },
  });

  if (userWorkflow) return true;

  return false;
}

export async function upsertSmsReminderFieldForBooking({
  workflowId,
  eventTypeId,
  isSmsReminderNumberRequired,
}: {
  workflowId: number;
  isSmsReminderNumberRequired: boolean;
  eventTypeId: number;
}) {
  await upsertBookingField(
    getSmsReminderNumberField(),
    getSmsReminderNumberSource({
      workflowId,
      isSmsReminderNumberRequired,
    }),
    eventTypeId
  );
}

export async function removeSmsReminderFieldForBooking({
  workflowId,
  eventTypeId,
}: {
  workflowId: number;
  eventTypeId: number;
}) {
  await removeBookingField(
    {
      name: SMS_REMINDER_NUMBER_FIELD,
    },
    {
      id: `${workflowId}`,
      type: "workflow",
    },
    eventTypeId
  );
}
