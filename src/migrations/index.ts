import * as migration_20260201_223353 from './20260201_223353'
import * as migration_20260131_161800 from './20260131_161800_add_contact_form_background_image'
import * as migration_20260131_162000 from './20260131_162000_add_services_contact_form_background_image'

export const migrations = [
  {
    up: migration_20260201_223353.up,
    down: migration_20260201_223353.down,
    name: '20260201_223353',
  },
  {
    up: migration_20260131_161800.up,
    down: migration_20260131_161800.down,
    name: '20260131_161800_add_contact_form_background_image',
  },
  {
    up: migration_20260131_162000.up,
    down: migration_20260131_162000.down,
    name: '20260131_162000_add_services_contact_form_background_image',
  },
]
