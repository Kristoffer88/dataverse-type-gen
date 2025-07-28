// Generated React Query hooks for SystemUser
// Entity: User
// Generated: 2025-07-28T10:21:15.126Z

import { createEntityHooks } from 'dataverse-type-gen'
import type { ODataFilter, UseEntityOptions, UseEntityListOptions } from 'dataverse-type-gen'
import { SystemUserMetadata } from './systemuser.js'
import type { SystemUser } from './systemuser.js'
import type { SystemUserCreate, SystemUserUpdate } from './systemuser.js'

/**
 * React Query hooks for User
 * Provides type-safe data fetching with caching and synchronization
 * 
 * @example
 * // Fetch single entity
 * const { data: entity } = useSystemUser.useEntity('123e4567-e89b-12d3-a456-426614174000')
 * 
 * // Fetch entity list with filters
 * const { data: entities } = useSystemUser.useEntityList({
 *   statecode: 0 // Active
 * })
 */
export const useSystemUser = createEntityHooks<
    SystemUser,
    SystemUserCreate,
    SystemUserUpdate
>(SystemUserMetadata)

// Convenience exports with entity-specific names
export const useSystemUser = useSystemUser.useEntity
export const useSystemUserList = useSystemUser.useEntityList
export const useSystemUserCount = useSystemUser.useEntityCount
export const useSystemUserRelated = useSystemUser.useRelatedEntities

/**
 * Common filter patterns for User
 */
export type SystemUserFilters = ODataFilter<SystemUser>

/**
 * Helper filters for option set fields
 */
export const SystemUserFilterHelpers = {
    /** Filter by Access Mode */
    accessmode: {
        active: { accessmode: SystemuserAccessmode.Active?.Value } as SystemUserFilters,
        inactive: { accessmode: SystemuserAccessmode.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Address 1: Address Type */
    address1_addresstypecode: {
        active: { address1_addresstypecode: SystemuserAddress1Addresstypecode.Active?.Value } as SystemUserFilters,
        inactive: { address1_addresstypecode: SystemuserAddress1Addresstypecode.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Address 1: Shipping Method */
    address1_shippingmethodcode: {
        active: { address1_shippingmethodcode: SystemuserAddress1Shippingmethodcode.Active?.Value } as SystemUserFilters,
        inactive: { address1_shippingmethodcode: SystemuserAddress1Shippingmethodcode.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Address 2: Address Type */
    address2_addresstypecode: {
        active: { address2_addresstypecode: SystemuserAddress2Addresstypecode.Active?.Value } as SystemUserFilters,
        inactive: { address2_addresstypecode: SystemuserAddress2Addresstypecode.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Address 2: Shipping Method */
    address2_shippingmethodcode: {
        active: { address2_shippingmethodcode: SystemuserAddress2Shippingmethodcode.Active?.Value } as SystemUserFilters,
        inactive: { address2_shippingmethodcode: SystemuserAddress2Shippingmethodcode.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Azure State */
    azurestate: {
        active: { azurestate: SystemuserAzurestate.Active?.Value } as SystemUserFilters,
        inactive: { azurestate: SystemuserAzurestate.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by License Type */
    caltype: {
        active: { caltype: SystemuserCaltype.Active?.Value } as SystemUserFilters,
        inactive: { caltype: SystemuserCaltype.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Deleted State */
    deletedstate: {
        active: { deletedstate: SystemuserDeletestate.Active?.Value } as SystemUserFilters,
        inactive: { deletedstate: SystemuserDeletestate.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Primary Email Status */
    emailrouteraccessapproval: {
        active: { emailrouteraccessapproval: SystemuserEmailrouteraccessapproval.Active?.Value } as SystemUserFilters,
        inactive: { emailrouteraccessapproval: SystemuserEmailrouteraccessapproval.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Incoming Email Delivery Method */
    incomingemaildeliverymethod: {
        active: { incomingemaildeliverymethod: SystemuserIncomingemaildeliverymethod.Active?.Value } as SystemUserFilters,
        inactive: { incomingemaildeliverymethod: SystemuserIncomingemaildeliverymethod.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Invitation Status */
    invitestatuscode: {
        active: { invitestatuscode: SystemuserInvitestatuscode.Active?.Value } as SystemUserFilters,
        inactive: { invitestatuscode: SystemuserInvitestatuscode.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Outgoing Email Delivery Method */
    outgoingemaildeliverymethod: {
        active: { outgoingemaildeliverymethod: SystemuserOutgoingemaildeliverymethod.Active?.Value } as SystemUserFilters,
        inactive: { outgoingemaildeliverymethod: SystemuserOutgoingemaildeliverymethod.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Preferred Address */
    preferredaddresscode: {
        active: { preferredaddresscode: SystemuserPreferredaddresscode.Active?.Value } as SystemUserFilters,
        inactive: { preferredaddresscode: SystemuserPreferredaddresscode.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Preferred Email */
    preferredemailcode: {
        active: { preferredemailcode: SystemuserPreferredemailcode.Active?.Value } as SystemUserFilters,
        inactive: { preferredemailcode: SystemuserPreferredemailcode.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by Preferred Phone */
    preferredphonecode: {
        active: { preferredphonecode: SystemuserPreferredphonecode.Active?.Value } as SystemUserFilters,
        inactive: { preferredphonecode: SystemuserPreferredphonecode.Inactive?.Value } as SystemUserFilters,
    },
    /** Filter by System Managed User Type */
    systemmanagedusertype: {
        active: { systemmanagedusertype: SystemuserSystemmanagedusertype.Active?.Value } as SystemUserFilters,
        inactive: { systemmanagedusertype: SystemuserSystemmanagedusertype.Inactive?.Value } as SystemUserFilters,
    },
} as const

/**
 * Query key factory for User
 * Use these keys for manual cache manipulation
 */
export const SystemUserQueryKeys = {
    all: ['dataverse', 'systemuser'] as const,
    lists: () => [...SystemUserQueryKeys.all, 'list'] as const,
    list: (filters?: SystemUserFilters) => [...SystemUserQueryKeys.lists(), { filters }] as const,
    details: () => [...SystemUserQueryKeys.all, 'detail'] as const,
    detail: (id: string) => [...SystemUserQueryKeys.details(), id] as const,
    counts: () => [...SystemUserQueryKeys.all, 'count'] as const,
    count: (filters?: SystemUserFilters) => [...SystemUserQueryKeys.counts(), { filters }] as const,
}
