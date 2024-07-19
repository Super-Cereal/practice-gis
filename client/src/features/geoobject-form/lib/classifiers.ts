export const mockedClassifiers = [
    {
        name: 'Physiography',
        code: 'PH' ,
        commonInfo: 'Рельеф, география'
    },
    {
        name: 'Drainage',
        code: 'DN ' ,
        commonInfo: 'Гидрография'
    },
    {
        name: 'Populated_Places',
        code: 'PP' ,
        commonInfo: 'Населенные пункты'
    },
    {
        name: 'Roads',
        code: 'RD ' ,
        commonInfo: 'Дороги'
    },
    {
        name: 'Cultural_Landmarks',
        code: 'CL' ,
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
  