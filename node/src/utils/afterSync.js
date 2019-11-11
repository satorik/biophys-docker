const fixContraints = (sequelize) => sequelize.query(`DO 
$$
DECLARE r record;
  BEGIN
      FOR r IN SELECT conname
       FROM pg_catalog.pg_constraint con
          INNER JOIN pg_catalog.pg_class rel
                     ON rel.oid = con.conrelid
          INNER JOIN pg_catalog.pg_namespace nsp
                     ON nsp.oid = connamespace
     WHERE nsp.nspname = 'biophys'
           AND rel.relname = 'timetable'
           and con.contype='f'
      LOOP
          EXECUTE 'ALTER TABLE biophys.timetable DROP CONSTRAINT '|| quote_ident(r.conname) || ';';
      END LOOP;
  end
  $$;`)

  export {fixContraints}