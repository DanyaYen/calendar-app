import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { useCalendarLogic } from "../../hooks/useCalendarLogic";
import { getPublicHolidays } from "../../services/holidayService";
import type { TasksStructure, IHoliday, ITask } from "../../types";

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 40px);
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState<TasksStructure>({
    "2025-06-10": [
      { id: "1", text: "Кликни, чтобы изменить" },
      { id: "2", text: "Удержи и тащи" },
    ],
  });
  const [holidays, setHolidays] = useState<IHoliday[]>([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    })
  );
  const gridDays = useCalendarLogic(currentDate);

  useEffect(() => {
    getPublicHolidays(currentDate.getFullYear(), "UA").then(setHolidays);
  }, [currentDate.getFullYear()]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const activeId = active.id.toString();
    const overId = over.id.toString();

    setTasks((currentTasks) => {
      const newTasks: TasksStructure = JSON.parse(JSON.stringify(currentTasks));
      let sourceDate: string | undefined;
      let movedTask: ITask | undefined;

      for (const date in newTasks) {
        const taskIndex = newTasks[date].findIndex(
          (task) => task.id === activeId
        );
        if (taskIndex !== -1) {
          sourceDate = date;
          [movedTask] = newTasks[date].splice(taskIndex, 1);
          break;
        }
      }
      if (!movedTask || !sourceDate) return currentTasks;

      const destinationDate =
        Object.keys(newTasks).find((date) =>
          newTasks[date].some((task) => task.id === overId)
        ) || overId;
      const destinationTasks = newTasks[destinationDate] || [];
      const overIndex = destinationTasks.findIndex(
        (task) => task.id === overId
      );
      destinationTasks.splice(
        overIndex >= 0 ? overIndex : destinationTasks.length,
        0,
        movedTask
      );
      newTasks[destinationDate] = destinationTasks;

      if (newTasks[sourceDate]?.length === 0) delete newTasks[sourceDate];

      return newTasks;
    });
  };

  const handleSaveTask = (date: string, text: string, taskId?: string) => {
    setEditingTaskId(null);
    if (!text && !taskId) return;
    setTasks((prev) => {
      const newTasks = JSON.parse(JSON.stringify(prev));
      const dayTasks = newTasks[date] || [];
      if (taskId) {
        const taskIndex = dayTasks.findIndex((t) => t.id === taskId);
        if (taskIndex > -1)
          text
            ? (dayTasks[taskIndex].text = text)
            : dayTasks.splice(taskIndex, 1);
      } else if (text) {
        dayTasks.push({ id: crypto.randomUUID(), text });
      }
      if (dayTasks.length > 0) newTasks[date] = dayTasks;
      else delete newTasks[date];
      return newTasks;
    });
  };

  const filteredTasks = !filterQuery
    ? tasks
    : Object.keys(tasks).reduce((acc, date) => {
        const dateTasks = tasks[date].filter((task) =>
          task.text.toLowerCase().includes(filterQuery.toLowerCase())
        );
        if (dateTasks.length > 0) acc[date] = dateTasks;
        return acc;
      }, {} as TasksStructure);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <CalendarWrapper>
        <CalendarHeader
          currentDate={currentDate}
          onPrevMonth={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
            )
          }
          onNextMonth={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
            )
          }
          onSearch={setFilterQuery}
        />
        <CalendarGrid
          tasks={filteredTasks}
          holidays={holidays}
          editingTaskId={editingTaskId}
          onSetEditingTask={setEditingTaskId}
          onSaveTask={handleSaveTask}
          onStartCreatingTask={(date: string) =>
            setEditingTaskId(`new-${date}`)
          }
          gridDays={gridDays}
          currentMonth={currentDate.getMonth()}
        />
      </CalendarWrapper>
    </DndContext>
  );
};
