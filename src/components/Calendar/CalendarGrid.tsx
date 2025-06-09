import styled from "styled-components";
import { useDroppable } from "@dnd-kit/core";
import { DayCell } from "./DayCell";
import type { ITask, IHoliday, TasksStructure } from "../../types";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-left: 1px solid #eee;
  border-top: 1px solid #eee;
  height: 100%;
`;

const DayHeader = styled.div`
  text-align: center;
  font-weight: bold;
  padding: 12px 8px;
  background-color: #fafafa;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  font-size: 0.9rem;
`;

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const DroppableDayCellWrapper = (props: any) => {
  const { date } = props;
  const { setNodeRef } = useDroppable({ id: date });
  return (
    <div ref={setNodeRef} style={{ height: "100%" }}>
      <DayCell {...props} />
    </div>
  );
};

interface CalendarGridProps {
  gridDays: Date[];
  currentMonth: number;
  tasks: TasksStructure;
  holidays: IHoliday[];
  editingTaskId: string | null;
  onSetEditingTask: (taskId: string | null) => void;
  onSaveTask: (date: string, text: string, taskId?: string) => void;
  onStartCreatingTask: (date: string) => void;
}

export const CalendarGrid = (props: CalendarGridProps) => {
  const { gridDays, currentMonth, tasks, holidays } = props;
  const getFormattedDate = (date: Date) => date.toISOString().split("T")[0];
  const todayFormatted = getFormattedDate(new Date());

  return (
    <>
      <GridWrapper style={{ height: "auto" }}>
        {weekDays.map((day) => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
      </GridWrapper>
      <GridWrapper>
        {gridDays.map((day, index) => {
          const formattedDate = getFormattedDate(day);
          const dailyTasks = tasks[formattedDate] || [];
          const dailyHoliday = holidays.find((h) => h.date === formattedDate);

          return (
            <DroppableDayCellWrapper
              key={index}
              {...props}
              date={formattedDate}
              dayNumber={day.getDate()}
              tasks={dailyTasks}
              holiday={dailyHoliday}
              isCurrentMonth={day.getMonth() === currentMonth}
              isToday={formattedDate === todayFormatted}
            />
          );
        })}
      </GridWrapper>
    </>
  );
};
