import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunk: any) {
  /*
   * `useState()` is used here as an alternate option to using Redux Toolkit Query
   */
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | {}>(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(() => {
    setIsLoading(true);
    /*
     * `dispatch` breaks the promise's .then().catch() by automatically
     *  executing `.then()` regardless of a success or failure.
     *  To get around this, use `.unwrap()`.
     *  `.finally()` is used to remove rendundant code of adding:
     *   `.then(() => setIsLoadingUsers(false)).catch((err) => isLoadingUsers(false))`
     *   So it would look like:
     *   dispatch(thunk())
     *    .unwrap()
     *    .then(() => setIsLoadingUsers(false))
     *    .catch(err => {
     *      setIsLoadingUsers(false);
     *      setLoadingUsersError(err);
     *    });
     */
    dispatch(thunk())
      .unwrap()
      .catch((err: any) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);
  /*
   * without `as const`, will give error 'TS2349: This expression is not callable'
   * see https://www.github.com/microsoft/TypeScript/issues/35423
   * see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions
   */
  return [runThunk, isLoading, error] as const;
}
