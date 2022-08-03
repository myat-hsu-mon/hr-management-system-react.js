import Card from "shared/Card";
import { GrayText, Text } from "shared/Typography";

import Avatar from "components/Avatar";
import { formatDDMMYYYY } from "utils/formatDate";

export default function ProjectCard({
  title,
  description,
  status,
  deadline,
  projectManager,
  teams,
}) {
  return (
    <Card>
      <Card.Title className="mb-4">{title}</Card.Title>
      <Card.Content>
        <GrayText>{description}</GrayText>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div>
            <Text>Deadline</Text>
            <GrayText>{formatDDMMYYYY(deadline)}</GrayText>
          </div>
          <div>
            <Text>Status</Text>
            <GrayText>{status}</GrayText>
          </div>
          <div>
            <Text className="mb-1">Project Manager</Text>
            <Avatar {...projectManager} />
          </div>
          <div>
            <Text className="mb-1">Team Members</Text>
            <div className="flex items-center gap-1 flex-wrap">
              {teams.map((team) => (
                <Avatar {...team} key={team.name} />
              ))}
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
