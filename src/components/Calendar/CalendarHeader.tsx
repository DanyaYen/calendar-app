import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`;

const MonthDisplay = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 500;
  color: #333;
`;

const NavButton = styled.button`
  background: #f5f5f5;
  color: #555;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

// SearchInput будет теперь внутри этого файла для простоты
const SearchContainer = styled.div`
  position: relative;

  input {
    padding: 6px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-width: 200px;
    font-size: 0.9rem;
  }
`;

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSearch: (query: string) => void;
}

export const CalendarHeader = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onSearch,
}: CalendarHeaderProps) => {
  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <HeaderWrapper>
      <MonthDisplay>{monthName}</MonthDisplay>
      <ButtonGroup>
        <NavButton onClick={onPrevMonth}>&lt;</NavButton>
        <NavButton onClick={onNextMonth}>&gt;</NavButton>
        <SearchContainer>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </SearchContainer>
      </ButtonGroup>
    </HeaderWrapper>
  );
};
