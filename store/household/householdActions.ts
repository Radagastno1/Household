export const createHousehold = (name: string) => {
    return {
      type: 'CREATE_HOUSEHOLD',
      payload: {
        name,
      },
    };
  };