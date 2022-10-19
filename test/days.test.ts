import { addDays, eachDayOfInterval } from 'date-fns'
import { expect, test } from 'vitest'
import { getNearbyDays, getPrevDays, getNextDays } from '../src/composables/days'

const date = new Date(2022, 9, 19)

test('days', () => {
  expect(getNearbyDays(date, 1, 2)).toMatchInlineSnapshot(`
    [
      2022-10-17T16:00:00.000Z,
      2022-10-18T16:00:00.000Z,
      2022-10-19T16:00:00.000Z,
      2022-10-20T16:00:00.000Z,
    ]
  `)

  expect(getPrevDays(date, 1)).toMatchInlineSnapshot(`
    [
      2022-10-17T16:00:00.000Z,
    ]
  `)

  expect(getNextDays(date, 2)).toMatchInlineSnapshot(`
    [
      2022-10-19T16:00:00.000Z,
      2022-10-20T16:00:00.000Z,
    ]
  `)

  expect(addDays(date, -1)).toMatchInlineSnapshot('2022-10-17T16:00:00.000Z')

  expect(eachDayOfInterval({
    start: addDays(date, -1),
    end: date
  })).toMatchInlineSnapshot(`
    [
      2022-10-17T16:00:00.000Z,
      2022-10-18T16:00:00.000Z,
    ]
  `)

  expect(date.toLocaleString()).toMatchInlineSnapshot('"2022/10/19 上午12:00:00"')
})
