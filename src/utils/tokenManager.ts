function createTokenManager() {
  let accessToken: string | null = null;

  return {
    set(token: string) {
      accessToken = token;
      console.log('acess token', accessToken)
    },
    get() {
      return accessToken;
    },
    clear() {
      accessToken = null;
    },
  };
}

export const tokenManager = createTokenManager();
