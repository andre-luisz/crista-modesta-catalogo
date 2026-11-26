-- Somente leitura. Execute no SQL Editor e exporte os resultados.
select n.nspname as esquema, p.proname as funcao,
 pg_get_function_identity_arguments(p.oid) as argumentos,
 pg_get_functiondef(p.oid) as definicao
from pg_proc p join pg_namespace n on n.oid=p.pronamespace
where n.nspname='public' and p.prokind='f'
 and (p.proname ilike '%catalogo%' or p.proname ilike '%promo%' or p.proname ilike '%desconto%')
order by p.proname;

select table_name,column_name,data_type,is_nullable,column_default
from information_schema.columns where table_schema='public'
 and (table_name ilike '%promo%' or table_name ilike '%produto%' or table_name ilike '%variac%' or table_name ilike '%preco%')
order by table_name,ordinal_position;

select schemaname,tablename,policyname,roles,cmd,qual,with_check
from pg_policies where schemaname='public'
 and (tablename ilike '%promo%' or tablename ilike '%produto%' or tablename ilike '%variac%');
