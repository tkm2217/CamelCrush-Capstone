const storeUser = async (user) => {
    try {
      const isAvailable = await secureStore.isAvailableAsync();
      if (isAvailable) await secureStore.setItemAsync(key, JSON.stringify(user));
    } catch (error) {
      console.log("error while storing user: " + error);
    }
  };

  const readUser = async () => {
    try {
      const isAvailable = await secureStore.isAvailableAsync();
      if (isAvailable) return await secureStore.getItemAsync(key);
      else return null;
    } catch (error) {
      console.log("error while reading user: " + error);
    }
  };
