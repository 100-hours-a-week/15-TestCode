const generateAiResponse = async (page, aiMention) => {
  const messageInput = await page.getByPlaceholder('메시지를 입력하세요... (@를 입력하여 멘션, Shift + Enter로 줄바꿈)');
  await messageInput.fill(`${aiMention} hi`);
  await page.getByRole('button', { name: '메시지 보내기' }).click();

  console.info('AI response generated.');
  await page.waitForTimeout(5000);
};

module.exports = { generateAiResponse };