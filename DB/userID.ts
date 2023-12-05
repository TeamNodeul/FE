export let userID: number = 1;

/**Login(id) - id로 재 로그인 */
export const Login = (newID: number) => {
  userID = newID;
};
