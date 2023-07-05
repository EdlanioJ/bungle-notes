import { ArrowLeft, ArrowRight, CalendarIcon } from 'lucide-react'

import { Calendar } from '../Calendar'
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { DateFormatter } from '@/utils/date-formatter'

export const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

type Props = {
  value: Date
  onChange: (date: Date) => void
}
export function DateInput({ onChange, value }: Props) {
  const initDate = new Date()

  const [currMonth, setCurrMonth] = useState(initDate.getMonth())
  const [currYear, setCurrYear] = useState(initDate.getFullYear())

  // Begin Calendar
  const firstDayOfMonth = new Date(currYear, currMonth, 1).getDay()
  const lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate()
  const lastDayOfLastMonth = new Date(currYear, currMonth, 0).getDate()
  // End Calendar

  const handlePreview = () => {
    if (currMonth === 0) {
      setCurrMonth(11)
      const year = currYear - 1
      setCurrYear(year)
      return
    }
    setCurrMonth(currMonth - 1)
  }

  const handleNext = () => {
    if (currMonth === 11) {
      setCurrMonth(0)
      const year = currYear + 1
      setCurrYear(year)
      return
    }
    setCurrMonth(currMonth + 1)
  }

  return (
    <div className="w-full space-y-2 rounded-lg">
      <Popover>
        <Popover.Button className="flex w-full justify-between rounded-lg border px-3 py-2">
          <span>{DateFormatter.format(value)}</span>
          <CalendarIcon className="h-5 w-5 text-gray-400" />
        </Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="mt-1">
            {({ close }) => (
              <Calendar>
                <Calendar.Header>
                  <Calendar.NavigationButton
                    onClick={handlePreview}
                    icon={ArrowLeft}
                  />
                  <Calendar.MonthDetails>
                    {monthNames[currMonth]} {currYear}
                  </Calendar.MonthDetails>
                  <Calendar.NavigationButton
                    onClick={handleNext}
                    icon={ArrowRight}
                  />
                </Calendar.Header>
                <Calendar.Body>
                  <Calendar.WeekLabels />
                  <Calendar.MonthDays>
                    {Array(firstDayOfMonth)
                      .fill(null)
                      .map((_, index) => {
                        const day =
                          lastDayOfLastMonth + index + 1 - firstDayOfMonth
                        const date = new Date(currYear, currMonth - 1, day)
                        return (
                          <Calendar.Day
                            date={date}
                            disabled
                            key={`${date.getTime()}`}
                          />
                        )
                      })}

                    {Array(lastDateOfMonth)
                      .fill(null)
                      .map((_, index) => {
                        const day = index + 1
                        const date = new Date(currYear, currMonth, day)

                        const isSelected =
                          value.getFullYear() === date.getFullYear() &&
                          value.getMonth() === date.getMonth() &&
                          value.getDate() === date.getDate()

                        const isDisabled =
                          currYear < initDate.getFullYear() ||
                          (currYear === initDate.getFullYear() &&
                            currMonth < initDate.getMonth()) ||
                          (currYear === initDate.getFullYear() &&
                            currMonth === initDate.getMonth() &&
                            day < initDate.getDate())

                        function handleSelectDate(value: Date) {
                          onChange(value)
                          close()
                        }
                        return (
                          <Calendar.Day
                            date={date}
                            isSelected={isSelected}
                            disabled={isDisabled}
                            handleSelectDate={handleSelectDate}
                            key={`${date.getTime()}`}
                          />
                        )
                      })}
                  </Calendar.MonthDays>
                </Calendar.Body>
                <div className="flex-1" />
              </Calendar>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}
