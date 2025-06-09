import styled from "styled-components";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Holiday } from "../Holiday";
import { TaskInput } from "../Task/TaskInput";
import { SortableTask } from "../Task/SortableTask";
import type { ITask, IHoliday } from "../../types";

const CellWrapper = styled.div<{ $isCurrentMonth: boolean }>`
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 4px;
  min-height: 120px;
  background-color: ${(props) => (props.$isCurrentMonth ? "#fff" : "#f9f9f9")};
  color: ${(props) => (props.$isCurrentMonth ? "#333" : "#aaa")};
  display: flex;
  flex-direction: column;
`;

const DayNumber = styled.div<{ $isToday: boolean }>`
  font-weight: 500;
  margin-bottom: 4px;
  padding: 4px;
  align-self: flex-end;
  background-color: ${(props) => (props.$isToday ? "#007bff" : "transparent")};
  color: ${(props) => (props.$isToday ? "#fff" : "inherit")};
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;

const TasksContainer = styled.div`
  flex-grow: 1;
`;

interface DayCellProps {
  date: string;
  dayNumber: number;
  tasks: ITask[];
  holiday?: IHoliday;
  isCurrentMonth: boolean;
  isToday: boolean;
  editingTaskId: string | null;
  onSetEditingTask: (taskId: string | null) => void;
  onSaveTask: (text: string, taskId?: string) => void;
  onStartCreatingTask: () => void;
}

export const DayCell = (props: DayCellProps) => {
  const {
    tasks,
    holiday,
    isCurrentMonth,
    editingTaskId,
    onSetEditingTask,
    onSaveTask,
    onStartCreatingTask,
    date,
    dayNumber,
    isToday,
  } = props;
  const isCreating = editingTaskId === `new-${date}`;
  const taskIds = tasks.map((t) => t.id);

  const handleCellClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && isCurrentMonth && !editingTaskId) {
      onStartCreatingTask();
    }
  };

  return (
    <CellWrapper $isCurrentMonth={isCurrentMonth} onClick={handleCellClick}>
      {/* ИСПРАВЛЕНО ЗДЕСЬ */}
      <DayNumber $isToday={isToday}>{dayNumber}</DayNumber>

      {holiday && <Holiday holiday={holiday} />}
      <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
        <TasksContainer>
          {tasks.map((task) =>
            editingTaskId === task.id ? (
              <TaskInput
                key={task.id}
                initialText={task.text}
                onSave={(text) => onSaveTask(text, task.id)}
              />
            ) : (
              <SortableTask
                key={task.id}
                task={task}
                onClick={() => onSetEditingTask(task.id)}
              />
            )
          )}
        </TasksContainer>
      </SortableContext>
      {isCreating && <TaskInput onSave={(text) => onSaveTask(text)} />}
    </CellWrapper>
  );
};
