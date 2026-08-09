const dns = require('dns');

const resolver = new dns.Resolver();
resolver.setServers(['8.8.8.8']); // Use Google's Public DNS

resolver.resolve4('thewebpagebuilder.in', (err, addresses) => {
  if (err) {
    console.error(`Error resolving thewebpagebuilder.in: ${err}`);
  } else {
    console.log(`thewebpagebuilder.in A records: ${addresses.join(', ')}`);
  }
});

resolver.resolve4('www.thewebpagebuilder.in', (err, addresses) => {
  if (err) {
    console.error(`Error resolving www.thewebpagebuilder.in: ${err}`);
  } else {
    console.log(`www.thewebpagebuilder.in A records: ${addresses.join(', ')}`);
  }
});
