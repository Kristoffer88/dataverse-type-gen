export interface DataverseEntity {
  entityName: string
  displayName: string
  properties: DataverseProperty[]
}

export interface DataverseProperty {
  name: string
  type: string
  required: boolean
  description?: string
}

export interface EntityDefinitionResponse {
  '@odata.context': string
  value: EntityDefinition[]
}

export interface EntityDefinition {
  MetadataId: string
  LogicalName: string
  SchemaName: string
  DisplayName?: LocalizedLabel
  Description?: LocalizedLabel
  HasActivities: boolean
  HasFeedback: boolean
  HasNotes: boolean
  IsActivity: boolean
  IsCustomEntity: boolean
  OwnershipType: number
  PrimaryIdAttribute: string
  PrimaryNameAttribute: string
  EntitySetName: string
  Attributes?: AttributeMetadata[]
  OneToManyRelationships?: OneToManyRelationshipMetadata[]
  ManyToOneRelationships?: ManyToOneRelationshipMetadata[]
  ManyToManyRelationships?: ManyToManyRelationshipMetadata[]
}

export interface LocalizedLabel {
  LocalizedLabels: Array<{
    Label: string
    LanguageCode: number
  }>
  UserLocalizedLabel?: {
    Label: string
    LanguageCode: number
  }
}

export interface AttributeMetadata {
  MetadataId: string
  LogicalName: string
  SchemaName: string
  DisplayName?: LocalizedLabel
  Description?: LocalizedLabel
  AttributeType: string
  IsCustomAttribute: boolean
  IsValidForCreate: boolean
  IsValidForRead: boolean
  IsValidForUpdate: boolean
  RequiredLevel: {
    Value: string
  }
  IsPrimaryId?: boolean
  IsPrimaryName?: boolean
}

export interface DataverseErrorResponse {
  error: {
    code: string
    message: string
    '@Microsoft.PowerApps.CDS.ErrorDetails.OperationStatus'?: string
    '@Microsoft.PowerApps.CDS.ErrorDetails.SubErrorCode'?: string
    '@Microsoft.PowerApps.CDS.HelpLink'?: string
    '@Microsoft.PowerApps.CDS.TraceText'?: string
    '@Microsoft.PowerApps.CDS.InnerError.Message'?: string
  }
}

export interface DataverseErrorDetails {
  status: number
  statusText: string
  url: string
  method: string
  headers: Record<string, string>
  body?: string
  error?: DataverseErrorResponse['error']
  timestamp: string
  requestId?: string
}

export interface OptionSetConstant {
  [key: string]: { Value: number; Label: string }
}

export interface OneToManyRelationshipMetadata {
  MetadataId: string
  SchemaName: string
  ReferencedEntity: string
  ReferencedAttribute: string
  ReferencingEntity: string
  ReferencingAttribute: string
  RelationshipType: string
  IsCustomRelationship: boolean
}

export interface ManyToOneRelationshipMetadata {
  MetadataId: string
  SchemaName: string
  ReferencedEntity: string
  ReferencedAttribute: string
  ReferencingEntity: string
  ReferencingAttribute: string
  RelationshipType: string
  IsCustomRelationship: boolean
}

export interface ManyToManyRelationshipMetadata {
  MetadataId: string
  SchemaName: string
  Entity1LogicalName: string
  Entity1IntersectAttribute: string
  Entity2LogicalName: string
  Entity2IntersectAttribute: string
  IntersectEntityName: string
  RelationshipType: string
  IsCustomRelationship: boolean
}