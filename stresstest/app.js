const { chromium } = require('playwright');
const { addUser, login } = require('./app/auth/services');
const { createChat, talkChat, accessChat, scrollDown, addReactions, uploadFile } = require('./app/chat/services');
const { addProfileImage } = require('./app/profile/services');
const { generateAiResponse } = require('./app/ai/services');
const crypto = require('crypto');

const passwd = "123123";
const domain = "@test.com";
const chatName = "asdfasdf";
// TODO: 우리 사이트로 바꾸기
// const site = "https://chat.goorm-ktb-015.goorm.team";
const site = "https://chat.goorm-ktb-015.goorm.team";

const filename = './photo/test.jpeg';
const aiMention = "@wayneAI";
const findText = "hello";
const msg = "hello";
const group = "group_b";


async function registerUser(page) {
  const id = `${group}_${Date.now()}` // 임의의값
  const email = id + domain;

  try {
    await page.goto(site);
  } catch (e) {
    console.error('Error during page navigation:', e);
  } 
  await addUser(page, id, passwd, email);
  return { id, email };
};

async function loginUser(page) {
  try {
    // 회원가입 수행 후 로그인에 사용할 계정 정보 받기
    const { email } = await registerUser(page);

    // 로그인 페이지로 이동
    await page.goto(site);
    await login(page, email, passwd);
  } catch (err) {
    console.error('LoginUser 에러 발생:', err);
  } 
}

async function createNewChat(page) {
  const { id } = await registerUser(page);
  await createChat(page, id);
};


async function scrollChat(page) {
  await registerUser(page);
  await scrollDown(page);
};

async function sendMessageToChat(page) {
  try {
    const { id } = await registerUser(page);
    await accessChat(page, chatName);
  await talkChat(page, msg);
  } catch (err) {
    console.error('sendMessageToChat 에러 발생:', err);
  } 
};

async function reactionToMessage(page) {
  await registerUser(page);
  await accessChat(page, chatName);
  await addReactions(page, findText);
};

async function uploadFileToChat(page) {
  await loginUser(page);
  await accessChat(page, chatName);
  await uploadFile(page, filename);
};

async function updateProfileImage(page) {
  await registerUser(page);
  await addProfileImage(page, filename);
};

async function generateChatAiResponse(page) {
  await registerUser(page);
  await accessChat(page, chatName);
  await generateAiResponse(page, aiMention);
};

module.exports = { registerUser, loginUser, createNewChat, scrollChat, sendMessageToChat, reactionToMessage, uploadFileToChat, updateProfileImage, generateChatAiResponse };

/* for test
let browserInstance = null;
let pageInstance = null;

const getPage = async () => {
  if (!browserInstance) {
    browserInstance = await chromium.launch({ headless: true });
    console.log("Browser launched");
  }

  if (!pageInstance) {
    pageInstance = await browserInstance.newPage();
    console.log("Page created");
    await pageInstance.goto(site);
  }
  return pageInstance;
};

const run = async () => {
  // await loginUser();
  // await createNewChat();
  // await scrollChat();
  // await sendMessageToChat();
  // await reactionToMessage();
  await uploadFileToChat();
  // await updateProfileImage();
  // await generateChatAiResponse();
};

const main = async () => {
  await run();

  if (browserInstance) {
    await browserInstance.close();
    console.log("Browser closed");
  }
};

main();
*/
