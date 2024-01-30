const getConfig = () => {
    const END_POINT_BACK = process.env.REACT_APP_END_POINT_BACK || 'https://ypt60whgr5.execute-api.us-east-1.amazonaws.com/dev/';
    
    return {
      END_POINT_BACK,
     };
  };
  
  export default getConfig;


 