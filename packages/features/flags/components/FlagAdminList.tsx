import { trpc } from "@timely/trpc/react";
import type { RouterOutputs } from "@timely/trpc/react";
import { Badge, List, ListItem, ListItemText, ListItemTitle, Switch, showToast } from "@timely/ui";

export const FlagAdminList = () => {
  const [data] = trpc.viewer.features.list.useSuspenseQuery();
  return (
    <List roundContainer noBorderTreatment>
      {data.map((flag) => (
        <ListItem key={flag.slug} rounded={false}>
          <div className="flex flex-1 flex-col">
            <ListItemTitle component="h3">
              {flag.slug}
              &nbsp;&nbsp;
              <Badge variant="green">{flag.type?.replace("_", " ")}</Badge>
            </ListItemTitle>
            <ListItemText component="p">{flag.description}</ListItemText>
          </div>
          <div className="flex py-2">
            <FlagToggle flag={flag} />
          </div>
        </ListItem>
      ))}
    </List>
  );
};

type Flag = RouterOutputs["viewer"]["features"]["list"][number];

const FlagToggle = (props: { flag: Flag }) => {
  const {
    flag: { slug, enabled },
  } = props;
  const utils = trpc.useContext();
  const mutation = trpc.viewer.admin.toggleFeatureFlag.useMutation({
    onSuccess: () => {
      showToast("Flags successfully updated", "success");
      utils.viewer.features.list.invalidate();
      utils.viewer.features.map.invalidate();
    },
  });
  return (
    <Switch
      defaultChecked={enabled}
      onCheckedChange={(checked) => {
        mutation.mutate({ slug, enabled: checked });
      }}
    />
  );
};
