import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'services_blocks_contact_form') THEN
        EXECUTE 'ALTER TABLE services_blocks_contact_form ADD COLUMN IF NOT EXISTS background_image_id integer';
      END IF;
      IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = '_services_v_blocks_contact_form') THEN
        EXECUTE 'ALTER TABLE _services_v_blocks_contact_form ADD COLUMN IF NOT EXISTS background_image_id integer';
      END IF;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'services_blocks_contact_form' AND column_name = 'background_image_id') THEN
        EXECUTE 'ALTER TABLE services_blocks_contact_form DROP COLUMN background_image_id';
      END IF;
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = '_services_v_blocks_contact_form' AND column_name = 'background_image_id') THEN
        EXECUTE 'ALTER TABLE _services_v_blocks_contact_form DROP COLUMN background_image_id';
      END IF;
    END $$;
  `)
}
