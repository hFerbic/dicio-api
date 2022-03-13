export default function log(data: any) {
  if (process.env.NODE_ENV === 'dev') {
    console.log(data);
  }
}
