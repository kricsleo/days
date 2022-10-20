import { expect, test } from 'vitest'
import { getNearbyDays, isPeaceDay } from '../src/composables/days'
import { holidays, isChineseHoliday, isChineseWorkingDay } from '../src/composables/chinese-holidays'
import { isWeekend } from 'date-fns'

const date = new Date(2022, 9, 19)

test('days', () => {
  expect(getNearbyDays(date, 1, 1)).toMatchInlineSnapshot(`
    Map {
      2022-10-17T16:00:00.000Z => {
        "current": false,
        "marked": false,
        "peace": false,
        "selected": false,
        "tip": "",
        "today": false,
        "work": true,
      },
      2022-10-18T16:00:00.000Z => {
        "current": false,
        "marked": false,
        "peace": false,
        "selected": false,
        "tip": "",
        "today": false,
        "work": true,
      },
      2022-10-19T16:00:00.000Z => {
        "current": false,
        "marked": false,
        "peace": false,
        "selected": false,
        "tip": "",
        "today": true,
        "work": true,
      },
    }
  `)

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

  expect(isPeaceDay(new Date('2022-10-08'))).toMatchInlineSnapshot('false')
  expect(isChineseHoliday(new Date('2022-10-08'))).toMatchInlineSnapshot('false')
  expect(isChineseWorkingDay(new Date('2022-10-08'))).toMatchInlineSnapshot('true')
  expect(isWeekend(new Date('2022-10-08'))).toMatchInlineSnapshot('true')
})
