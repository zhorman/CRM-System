function createTokenManager() {
  let accessToken: string | null = null;

  return {
    set(token: string) {
      accessToken = token;
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
