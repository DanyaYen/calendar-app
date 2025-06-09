// src/components/Task/SortableTask.tsx

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "./TaskCard";
import type { ITask } from "../../types";

const taskColors = [
  "#f9d43b",
  "#f29b2b",
  "#67c7d3",
  "#5fb075",
  "#e57373",
  "#7986cb",
];

// Простая функция для выбора цвета на основе ID
const getColorForTask = (taskId: string) => {
  const hash = taskId
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return taskColors[hash % taskColors.length];
};

interface SortableTaskProps {
  task: ITask;
  onClick: () => void;
}

export const SortableTask = ({ task, onClick }: SortableTaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const color = getColorForTask(task.id);

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onClick={onClick} color={color} />
    </div>
  );
};
