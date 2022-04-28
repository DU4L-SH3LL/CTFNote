ALTER TABLE ctfnote.profile
ADD COLUMN "lastactive" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP;

CREATE TYPE ctfnote.update_last_active_response AS (
    ok boolean
);

/* UpdateLastActive */
CREATE FUNCTION ctfnote.update_last_active ()
  RETURNS ctfnote.update_last_active_response
  AS $$
  BEGIN
    UPDATE ctfnote.profile
      SET lastactive = now()
      WHERE id = ctfnote_private.user_id ();
    RETURN ROW (TRUE)::ctfnote.update_last_active_response;
  END;
$$
LANGUAGE plpgsql VOLATILE
SECURITY DEFINER;
GRANT EXECUTE ON FUNCTION ctfnote.update_last_active () TO user_guest;