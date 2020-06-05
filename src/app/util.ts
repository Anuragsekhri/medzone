// export const main = 'prod';
// export const isProd = true;
// export const CreateUser = 'CreateUserProd';
// export const CreateEmployee = 'CreateEmployeeProd';
// export const updateEmployee = 'updateEmployeeProd';
// export const dailyNotification = 'dailyNotification';
// export const driverCreateFun = 'https://us-central1-hop-logistics.cloudfunctions.net/CreateUserProd';
// export const driverUpdateFun = 'https://us-central1-hop-logistics.cloudfunctions.net/updateUserProd';

export const main = 'dev';
export const isProd = false;
export const CreateUser = 'CreateUserDev'; 
export const CreateEmployee = 'CreateEmployeeDev';
export const updateEmployee = 'updateEmployeeDev';
export const dailyNotification = 'dailyNotification-dev';
export const docverCreateFun = 'https://us-central1-hop-logistics.cloudfunctions.net/CreateUserDev';
export const driverUpdateFun = 'https://us-central1-hop-logistics.cloudfunctions.net/updateUserDev'; 

export const sendDriverNotification = "https://us-central1-hop-logistics.cloudfunctions.net/driverRequestNotificationTwo"; 

export const recreateInvoice = 'recreateInvoice';
export const hyphen = '-';
export const vehicleTypes = 'vehicleTypes'+hyphen+main;
export const vehicleCategory = 'vehicleCategory'+hyphen+main; 
export const serviceRequest = 'serviceRequest'+hyphen+main;
export const drivers = 'drivers'+hyphen+main;
export const statistics = 'statistics'+hyphen+main;
export const beforeRide = 'beforeRide'+hyphen+main;
export const rules = 'rules'+hyphen+main;
export const driverRules = 'driverRules'+hyphen+main;
export const driverDailyStats = 'driverDailyStats'+hyphen+main;
export const goodsType = 'goodsType'+hyphen+main;
export const driverDocuments = 'driverDocuments'+hyphen+main;
export const driverUnions = 'driverUnions'+hyphen+main;
export const promoCode = 'promoCode'+hyphen+main;
export const supportQueries = 'supportQueries'+hyphen+main;
export const driverWeelkyPaymentModel = 'driverWeelkyPaymentModel'+hyphen+main;
export const Users = 'Users'+hyphen+main;
export const VehicleCategoryImages = 'VehicleCategoryImages'+hyphen+main;
export const moduleCollection = 'module'+hyphen+main;
export const employeeCollection = 'employees'+hyphen+main;
export const driverNotifications = 'driverNotifications'+hyphen+main;
// export const promoCodeStatsDev = 'promoCodeStats'+hyphen+main;
export const statsYear = 'statsYear'+hyphen+main;
export const statsMonth = 'statsMonth'+hyphen+main;
export const statsDay = 'statsDay'+hyphen+main;
export const promoStats = 'promoStats'+hyphen+main;
export const rideStats = 'rideStats'+hyphen+main;
export const vehicleGoodsStats = 'vehicleGoodsStats'+hyphen+main;
export const userStats = 'userStats'+hyphen+main;
export const insuranseCollection = 'insurance'+hyphen+main;
export const cityCollection = 'cities'+hyphen+main;
export const notificationCollection = 'notification'+hyphen+main;
export const orderCollection = 'order'+hyphen+main;
export const monthlyOrderCollection = 'monthlyOrder'+hyphen+main;
export const statesArray = [
    {
        state: 'Punjab',
        cities: ["Ludhiana"]
    }
];