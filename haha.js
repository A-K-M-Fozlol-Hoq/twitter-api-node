//loads the Node core DNS module
var dns = require('dns');

function checkAvailable(url) {
  //uses the core modules to run an IPv4 resolver that returns 'err' on error
  dns.resolve4(url, function (err, addresses) {
    if (err) {
      console.log(url + ' is possibly an available : ' + err);
    } else {
      console.log(url + ' is available--> ', addresses);
    }
  });
}
// calls the function of a given url
checkAvailable('facebook.com');

// let messages = [
//   {
//     id: '1559448656247660548',
//     created_timestamp: '1660636507461',
//     message_create: {
//       target: {
//         recipient_id: '753394321',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '3033300',
//       message_data: {
//         text: 'test message 50-4',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559448648093958148',
//     created_timestamp: '1660636505517',
//     message_create: {
//       target: {
//         recipient_id: '753394321',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '3033300',
//       message_data: {
//         text: 'test message 50-3',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559448641655685124',
//     created_timestamp: '1660636503982',
//     message_create: {
//       target: {
//         recipient_id: '753394321',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '3033300',
//       message_data: {
//         text: 'test message 50-2',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559448634001084422',
//     created_timestamp: '1660636502157',
//     message_create: {
//       target: {
//         recipient_id: '753394321',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '3033300',
//       message_data: {
//         text: 'test message 50-1',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559445491577851908',
//     created_timestamp: '1660635752945',
//     message_create: {
//       target: {
//         recipient_id: '1172153224448499712',
//       },
//       sender_id: '1500719420255391747',
//       message_data: {
//         text: 'Working good',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559432260461674500',
//     created_timestamp: '1660632598401',
//     message_create: {
//       target: {
//         recipient_id: '1172153224448499712',
//       },
//       sender_id: '753394321',
//       message_data: {
//         text: 'Walaikumussalam brother',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559432180241436682',
//     created_timestamp: '1660632579275',
//     message_create: {
//       target: {
//         recipient_id: '753394321',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '3033300',
//       message_data: {
//         text: 'Assalamualykum',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559420613332045829',
//     created_timestamp: '1660629821509',
//     message_create: {
//       target: {
//         recipient_id: '1500719420255391747',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '23044841',
//       message_data: {
//         text: '3',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559411893525450757',
//     created_timestamp: '1660627742545',
//     message_create: {
//       target: {
//         recipient_id: '1500719420255391747',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '3033300',
//       message_data: {
//         text: 'Test message 2/',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559411869987016708',
//     created_timestamp: '1660627736933',
//     message_create: {
//       target: {
//         recipient_id: '1500719420255391747',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '3033300',
//       message_data: {
//         text: 'Ata akta test message, Message API kaaj kore kina ta dekhar jonne.',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559411727053516804',
//     created_timestamp: '1660627702855',
//     message_create: {
//       target: {
//         recipient_id: '1500719420255391747',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '3033300',
//       message_data: {
//         text: 'Assalamualykum vai!',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559411621801639941',
//     created_timestamp: '1660627677761',
//     message_create: {
//       target: {
//         recipient_id: '1492530024985300992',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '3033300',
//       message_data: {
//         text: 'Ata akta test message, message API implement korar jonne',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
//   {
//     id: '1559411568143900681',
//     created_timestamp: '1660627664968',
//     message_create: {
//       target: {
//         recipient_id: '1492530024985300992',
//       },
//       sender_id: '1172153224448499712',
//       source_app_id: '3033300',
//       message_data: {
//         text: 'Assalamualykum vai.',
//         entities: {
//           hashtags: [],
//           symbols: [],
//           user_mentions: [],
//           urls: [],
//         },
//       },
//     },
//   },
// ];

// const organizedMessages = {};
// messages.forEach((message) => {
//   const sender_id = message.message_create.sender_id;
//   const recipient_id = message.message_create.target.recipient_id;
//   console.log(sender_id, recipient_id);
// });
