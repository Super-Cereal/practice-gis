import { nanoid } from "nanoid";

export const mockedClassifiers = [
  {
    id: nanoid(),
    name: 'Physiography',
    code: 'PH',
    commonInfo: 'Рельеф, география'
  },
  {
    id: nanoid(),
    name: 'Drainage',
    code: 'DN ',
    commonInfo: 'Гидрография'
  },
  {
    id: nanoid(),
    name: 'Populated_Places',
    code: 'PP',
    commonInfo: 'Населенные пункты'
  },
  {
    id: nanoid(),
    name: 'Roads',
    code: 'RD ',
    commonInfo: 'Дороги'
  },
  {
    id: nanoid(),
    name: 'Cultural_Landmarks',
    code: 'CL',
    commonInfo: 'Промышленные, сельскохозяйственные и социально-культурные объекты'
  },

]

export const getClassifierCodeWithType = (type: string, code: string) => {
  let typeCode = '';

  switch (type) {
    case 'Point':
      typeCode = 'P';
      break;
    case 'PolyLine':
      typeCode = 'L';
      break;
    case 'Polygon':
      typeCode = 'A';
      break;
    default:
      typeCode = '';
  }

  return code + typeCode;
};
