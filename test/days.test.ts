import { expect, test } from 'vitest'
import { isOffDay } from '../src/composables/days'
import { holidays, isChineseHoliday, isChineseWorkingDay } from '../src/composables/chinese-holidays'
import { isWeekend } from 'date-fns'

test('days', () => {
  expect(holidays.slice(0, 2)).toMatchInlineSnapshot(`
    [
      {
        "name": "元旦",
        "range": [
          "2016-01-01",
          "2016-01-03",
        ],
        "type": "holiday",
      },
      {
        "name": "春节",
        "range": [
          "2016-02-06",
        ],
        "type": "workingday",
      },
    ]
  `)

  expect(isOffDay(new Date('2022-10-08'))).toMatchInlineSnapshot('false')
  expect(isChineseHoliday(new Date('2022-10-08'))).toMatchInlineSnapshot('false')
  expect(isChineseWorkingDay(new Date('2022-10-08'))).toMatchInlineSnapshot('true')
  expect(isWeekend(new Date('2022-10-08'))).toMatchInlineSnapshot('true')
})
