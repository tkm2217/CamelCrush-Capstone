const storeUser = async (user) => {
    try {
      const isAvailable = await secureStore.isAvailableAsync();
      if (isAvailable) await secureStore.setItemAsync(key, JSON.stringify(user));
    } catch (error) {
      console.log("error while storing user: " + error);
    }
  };