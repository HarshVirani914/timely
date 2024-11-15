import type { RouterOutputs } from "@timely/trpc/react";
import { trpc } from "@timely/trpc/react";
import { showToast } from "@timely/ui";
import { useState } from "react";

import OtherTeamListItem from "./OtherTeamListItem";

interface Props {
  teams: RouterOutputs["viewer"]["organizations"]["listOtherTeams"];
  pending?: boolean;
}

export default function OtherTeamList(props: Props) {
  const utils = trpc.useContext();

  const [hideDropdown, setHideDropdown] = useState(false);

  function selectAction(action: string, teamId: number) {
    switch (action) {
      case "disband":
        deleteTeam(teamId);
        break;
    }
  }

  const deleteTeamMutation = trpc.viewer.organizations.deleteTeam.useMutation({
    async onSuccess() {
      await utils.viewer.organizations.listOtherTeams.invalidate();
    },
    async onError(err) {
      showToast(err.message, "error");
    },
  });

  function deleteTeam(teamId: number) {
    deleteTeamMutation.mutate({ teamId });
  }

  return (
    <ul className="bg-default divide-subtle border-subtle mb-2 divide-y overflow-hidden rounded-md border">
      {props.teams.map((team) => (
        <OtherTeamListItem
          key={team?.id as number}
          team={team}
          onActionSelect={(action: string) => selectAction(action, team?.id as number)}
          isLoading={deleteTeamMutation.isLoading}
          hideDropdown={hideDropdown}
          setHideDropdown={setHideDropdown}
        />
      ))}
    </ul>
  );
}
