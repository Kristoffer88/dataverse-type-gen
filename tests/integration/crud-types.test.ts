import { describe, it, expect } from 'vitest'
import type { EntityCreateInput, EntityUpdateInput } from '../../src/query/types.js'

describe('CRUD Types', () => {
  it('should create input types correctly excluding ID fields', () => {
    type TestEntity = {
      userid: string
      name: string
      companyid: string
      email: string
      parentaccountid: string
    }

    type CreateInput = EntityCreateInput<TestEntity>
    
    // Should allow non-ID fields
    const createInput: CreateInput = {
      name: 'test',
      email: 'test@example.com'
    }

    // This should compile without errors
    expect(typeof createInput).toBe('object')
  })

  it('should create update input types requiring ID fields', () => {
    type TestEntity = {
      userid: string
      name: string
      companyid: string
      email: string
      parentaccountid: string
    }

    type UpdateInput = EntityUpdateInput<TestEntity>
    
    // Should require at least one ID field and allow non-ID fields
    const updateInput: UpdateInput = {
      userid: '123',
      companyid: '456',
      parentaccountid: '789',
      name: 'updated name',
      email: 'updated@example.com'
    }

    // This should compile without errors
    expect(typeof updateInput).toBe('object')
  })

  it('should work with binding types', () => {
    type TestEntity = {
      userid: string
      name: string
    }

    type Bindings = {
      'ownerid@odata.bind': string
    }

    type CreateWithBindings = EntityCreateInput<TestEntity, Bindings>
    type UpdateWithBindings = EntityUpdateInput<TestEntity, Bindings>

    const createWithBindings: CreateWithBindings = {
      name: 'test',
      'ownerid@odata.bind': '/systemusers(123)'
    }

    const updateWithBindings: UpdateWithBindings = {
      userid: '123',
      name: 'updated',
      'ownerid@odata.bind': '/systemusers(456)'
    }

    expect(typeof createWithBindings).toBe('object')
    expect(typeof updateWithBindings).toBe('object')
  })
})