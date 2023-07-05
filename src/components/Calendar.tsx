import clsx from 'clsx'
import type { Icon as IconType } from 'lucide-react'
import type { HTMLAttributes } from 'react'

type CalendarProps = {
  children: React.ReactNode
}
function Calendar({ children }: CalendarProps) {
  return (
    <div className="flex w-fit flex-col gap-2 rounded-md border bg-white p-2">
      {children}
    </div>
  )
}

type HeaderProps = {
  children: React.ReactNode
}
function Header({ children }: HeaderProps) {
  return <div className="flex items-center justify-between">{children}</div>
}

type MonthDetailsProps = {
  children: React.ReactNode
}
function MonthDetails({ children }: MonthDetailsProps) {
  return (
    <p className="flex items-center justify-center gap-1 bg-white text-sm font-bold">
      {children}
    </p>
  )
}

interface NavigationButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: IconType
}
function NavigationButton({ icon: Icon, ...rest }: NavigationButtonProps) {
  return (
    <button
      type="button"
      className="grid h-8 w-8 place-content-center rounded-full bg-white text-sm font-bold text-gray-800 transition-colors duration-200 hover:bg-purple-100"
      {...rest}
    >
      <Icon />
    </button>
  )
}

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
function WeekLabels() {
  return (
    <ul className="flex items-center justify-between text-xs text-gray-700">
      {weekDays.map((weekDay) => (
        <li key={weekDay}>
          <span>{weekDay}</span>
        </li>
      ))}
    </ul>
  )
}

type BodyProps = {
  children: React.ReactNode
}

function Body({ children }: BodyProps) {
  return <div className="flex w-fit flex-col gap-4">{children}</div>
}

type MonthDaysProps = {
  children: React.ReactNode
}
function MonthDays({ children }: MonthDaysProps) {
  return <div className="grid w-fit grid-cols-7 gap-1">{children}</div>
}

interface DayProps {
  date: Date
  isSelected?: boolean
  disabled?: boolean
  handleSelectDate?: (date: Date) => void
}

function Day({ date, disabled, isSelected, handleSelectDate }: DayProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => handleSelectDate && handleSelectDate(date)}
      className={clsx(
        'relative grid h-9 w-9 place-content-center rounded-md',
        'disabled:text-gray-400 ',
        {
          'text-gray-700 hover:bg-purple-100': !isSelected && !disabled,
          'bg-violet-600 text-white': isSelected,
        },
      )}
    >
      {date.getDate()}
    </button>
  )
}

Calendar.Header = Header
Calendar.MonthDetails = MonthDetails
Calendar.NavigationButton = NavigationButton
Calendar.WeekLabels = WeekLabels
Calendar.Body = Body
Calendar.MonthDays = MonthDays
Calendar.Day = Day
export { Calendar }
