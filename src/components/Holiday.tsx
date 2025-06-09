import styled from "styled-components";
import type { IHoliday } from "../types";

const HolidayWrapper = styled.div`
  background-color: #f0fff0;
  color: #2e7d32;
  padding: 8px 12px;
  border-radius: 3px;
  margin-bottom: 6px;
  border-left: 5px solid #66bb6a;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  font-size: 0.85rem;
  user-select: none;
`;

interface HolidayProps {
  holiday: IHoliday;
}

export const Holiday = ({ holiday }: HolidayProps) => {
  return <HolidayWrapper>{holiday.name}</HolidayWrapper>;
};
