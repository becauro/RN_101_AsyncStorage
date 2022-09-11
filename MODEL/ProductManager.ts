import AsyncStorage from '@react-native-async-storage/async-storage';

type ProductType = {
  Code: number;
  Name: String;
  Quantity: Number;
};

class ProductManager {
  // HELPER Method:

  public async checkIfKeyExists(code: string) {
    return (await AsyncStorage.getAllKeys()).some(key => key === code);
  }

  // NORMAL Methods:

  public async add(product: ProductType) {
    try {
      const jsonValue = JSON.stringify(product);
      await AsyncStorage.setItem(product.Code.toString(), jsonValue);
    } catch (error) {
      console.log('Add() error from ProductManager.ts :');
      console.log(error);
    }
  }

  public async update(product: ProductType) {
    try {
      const jsonValue = JSON.stringify(product);
      await AsyncStorage.mergeItem(product.Code.toString(), jsonValue);
    } catch (error) {
      console.log('Update() error from ProductManager.ts :');
      console.log(error);
    }
  }

  public async remove(key: string) {
    try {
      await AsyncStorage.removeItem(key.toString());
    } catch (error) {
      console.log('remove() error from ProductManager.ts :');
      console.log(error);
    }
  }

  public async removeAll() {
    try {
      let keys = await AsyncStorage.getAllKeys();
      keys.forEach(async (key: string) => {
        await AsyncStorage.removeItem(key);
      });
    } catch (error) {
      console.log('removeAll() error from ProductManager.ts :');
      console.log(error);
    }
  }

  public async getOne(key: number) {
    try {
      return await AsyncStorage.getItem(key.toString());
    } catch (error) {
      console.log('getOne() error from ProductManager.ts :');
      console.log(error);
    }
  }

  public async getAll(): Promise<Array<ProductType>> {
    let objects: Array<ProductType> = [];
    try {
      let keys = await AsyncStorage.getAllKeys();
      let objJSON = await AsyncStorage.multiGet(keys);

      if (objJSON != null && objJSON.length > 0) {
        objJSON.forEach((element: any) => {
          let product: ProductType = JSON.parse(element[1]);
          objects.push(product);
        });
      }
    } catch (error) {
      console.log('gelAll() error from ProductManager.ts :');
      console.log(error);
    }
    return objects;
  }
}

export default ProductManager;
