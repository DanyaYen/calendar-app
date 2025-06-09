import styled from "styled-components";
import type { ITask } from "../../types";

const CardWrapper = styled.div<{ $color: string }>`
  background-color: #fff;
  color: #333;
  padding: 8px 12px;
  border-radius: 3px;
  margin-bottom: 6px;
  cursor: pointer;
  border-left: 5px solid ${(props) => props.$color};
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  font-size: 0.85rem;
  user-select: none;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

interface TaskCardProps {
  task: ITask;
  onClick: () => void;
  color: string;
}

export const TaskCard = ({ task, onClick, color }: TaskCardProps) => {
  return (
    <CardWrapper onClick={onClick} $color={color}>
      {task.text}
    </CardWrapper>
  );
};
