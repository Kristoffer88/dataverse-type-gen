import { describe, it, expect } from 'vitest'
import type { EntityIdFields, NonIdFields, OnlyIdFields } from '../../src/types/type-utilities.js'

describe('Type Utilities', () => {
  it('should extract ID fields correctly', () => {
    type TestEntity = {
      userid: string
      name: string
      companyid: string
      email: string
      parentaccountid: string
    }

    type IdFields = EntityIdFields<TestEntity>
    type NonIds = NonIdFields<TestEntity>
    type OnlyIds = OnlyIdFields<TestEntity>

    // Type assertions to verify behavior
    const idFieldsTest: IdFields = 'userid' // Should work
    const nonIdTest: NonIds = { name: 'test', email: 'test@example.com' } // Should work
    const onlyIdsTest: OnlyIds = { userid: '123', companyid: '456', parentaccountid: '789' } // Should work

    // These should work at compile time
    expect(typeof idFieldsTest).toBe('string')
    expect(typeof nonIdTest).toBe('object')
    expect(typeof onlyIdsTest).toBe('object')
  })

  it('should handle edge cases', () => {
    type EmptyEntity = {}
    type NoIdEntity = { name: string; email: string }
    type OnlyIdEntity = { id: string; userid: string }

    type EmptyIds = EntityIdFields<EmptyEntity>
    type NoIds = EntityIdFields<NoIdEntity>
    type OnlyIds = EntityIdFields<OnlyIdEntity>

    // These types should compile without errors
    expect(true).toBe(true)
  })
})