const needle = require('needle');
const axios = require('axios');

// //   .get('http://localhost:5000/getActivity?userID=4QRhOGvNjYMlctZgI1a3uSNeyv02')
// axios
//   .get('http://localhost:5000/getActivity', {
//     params: { userID: '4QRhOGvNjYMlctZgI1a3uSNeyv02' },
//   })
//   .then((res) => showOutput(res))
//   .catch((err) => console.error('err'));

async function getRequest() {
  //   const params = {
  //     auserID: '4QRhOGvNjYMlctZgI1a3uSNeyv02',
  //   };

  //   const res = await axios.get('http://localhost:5000/getActivity', { params });
  //   console.log(res);

  //   axios
  //     .get('http://localhost:5000/getActivity', {
  //       params: { userID: '4QRhOGvNjYMlctZgI1a3uSNeyv02' },
  //     })
  //     .then((res) => showOutput(res))
  //     .catch((err) => console.error('err'));

  axios
    .put('http://localhost:5000/updateActivity', {
      // , screenName: 'zawwadx'
      // data: { userID: 'NpZEIUw9RBXYZMiNgd5bUY4otCB2' },
      // , screenName: 'AFozlol'
      // data: { userID: '4QRhOGvNjYMlctZgI1a3uSNeyv02' },
      // screenName: 'FoysalBN'
      // data: { userID: 'ze2yaXChk8Xvoers6vbq1h35sP53' },
      // screenName: 'ShahriarRizvi03'
      data: { userID: 'yntrSLjQYCXeeDTL1gVea5EenL63' },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.error('err', err));
}
getRequest();

async function deleteRequest() {
  axios
    .delete('http://localhost:5000/deleteAllAnalysis')
    .then((res) => console.log(res.data))
    .catch((err) => console.error('err', err));
}
// deleteRequest();
