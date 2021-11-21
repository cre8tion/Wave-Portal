const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.1'),
    });
    await waveContract.deployed();
    console.log('Contract deployed to:', waveContract.address);
  
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());
    
    await waveContract.getTotalWavesOfSender();

    let waveTxn = await waveContract.wave('A message!');
    await waveTxn.wait();

    await waveContract.getTotalWavesOfSender();
    await waveContract.getTotalWaves();

    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).wave('Another message!');
    await waveTxn.wait();

    await waveContract.connect(randomPerson).getTotalWavesOfSender();
    await waveContract.getTotalWaves();

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};
  
const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
};
  
runMain();