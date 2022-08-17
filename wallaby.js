export default function () {
  return {
    env: {
      params: {
        runner: '-r dotenv/config --experimental-vm-modules',
      },
    },
  }
}
