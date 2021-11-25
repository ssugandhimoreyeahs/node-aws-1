const os = require("os");

class OSPerformance {
  cpus = os.cpus();
  freeMemory = os.freemem();
  totalMemory = os.totalmem();
  usedMemory = this.totalMemory - this.freeMemory;
  memoryUsage = Math.floor((this.usedMemory / this.totalMemory) * 100) / 100;
  osType = os.type() == "Darwin" ? "Mac" : os.type();
  upTime = os.uptime();
  cpuModel = this.cpus[0].model;
  numCores = this.cpus.length;
  cpuSpeed = this.cpus[0].speed;
  cpuLoad = 0;
  isActive = true;

  constructor() {
    this.freeMemoryGB = this.toGB(this.freeMemory);
    this.totalMemoryGB = this.toGB(this.totalMemory);
    this.usedMemoryGB = this.toGB(this.usedMemory);
  }
  computeCpuLoad = async () => {
    const cpuLoadCompute = await this.getCpuLoad();
    this.cpuLoad = cpuLoadCompute;
    console.log("CPU_LOAD - ", cpuLoadCompute);
    return Promise.resolve(true);
  };
  getCpuLoad = () => {
    return new Promise((resolve, reject) => {
      const start = this.cpuAverage();
      setTimeout(() => {
        const end = this.cpuAverage();
        const idleDifference = end.idle - start.idle;
        const totalDifference = end.total - start.total;
        // console.log(idleDifference,totalDifference)
        // calc the % of used cpu
        const percentageCpu =
          100 - Math.floor((100 * idleDifference) / totalDifference);
        resolve(percentageCpu);
      }, 100);
    });
  };
  cpuAverage = () => {
    const cpus = os.cpus();
    let idleMs = 0;
    let totalMs = 0;
    cpus.forEach((aCore) => {
      for (let type in aCore.times) {
        totalMs += aCore.times[type];
      }
      idleMs += aCore.times.idle;
    });
    return {
      idle: idleMs / cpus.length,
      total: totalMs / cpus.length,
    };
  };
  toGB = (byte) => {
    return byte / Math.pow(1024, 3);
  };
}
module.exports = OSPerformance;
