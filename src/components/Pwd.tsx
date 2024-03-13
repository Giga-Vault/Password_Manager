import { useEffect, useState } from 'react';
import copyIcon from '../assets/copy-icon.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useParams } from 'react-router-dom';

const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList = '0123456789';
const symbolsList = "!@#$%^&*()?";

function PasswordGenerator() {
  const { uid } = useParams();
  const [password, setPassword] = useState<string>('');
  const [lowerCase, setLowerCase] = useState<boolean>(true);
  const [upperCase, setUpperCase] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [symbols, setSymbols] = useState<boolean>(true);
  const [passwordLength, setPasswordLength] = useState<number>(6);
  const [selectedChoices, setSelectedChoices] = useState<string[]>(['lowercase', 'uppercase', 'numbers', 'symbols']);

  useEffect(() => {
    generatePassword();
  }, [passwordLength, lowerCase, upperCase, numbers, symbols]); 

  const handleCheckbox = (type: string) => {
    setSelectedChoices(prevChoices => {
      let tempChoices = [...prevChoices];
      selectedChoices.includes(type) ? tempChoices = tempChoices.filter(choice => choice !== type) : tempChoices.push(type);
      if (tempChoices.includes(type)) {
        tempChoices = tempChoices.filter(choice => choice !== type);
      } else {
        tempChoices.push(type);
      }

      switch (type) {
        case 'lowercase':
          setLowerCase(!lowerCase);
          break;
        case 'uppercase':
          setUpperCase(!upperCase);
          break;
        case 'numbers':
          setNumbers(!numbers);
          break;
        case 'symbols':
          setSymbols(!symbols);
          break;
        default:
          break;
      }

      return tempChoices;
    });
  };

  const generatePassword = () => {
    let characterList = '';
    if (lowerCase) {
      characterList += lowercaseList;
    }
    if (upperCase) {
      characterList += uppercaseList;
    }
    if (numbers) {
      characterList += numbersList;
    }
    if (symbols) {
      characterList += symbolsList;
    }

    let tempPassword = '';
    const characterListLength = characterList.length;

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characterListLength);
      tempPassword += characterList.charAt(characterIndex);
    }

    setPassword(tempPassword);
  };

  const copyPassword = async () => {
    const copiedText = await navigator.clipboard.readText();
    if (password.length && copiedText !== password) {
      navigator.clipboard.writeText(password);
      toast.success('Password copied to clipboard!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: { bottom: '100px' }
      });
    }
  };

  return (
    <div className='App bg-gray-200 w-full flex flex-col h-screen justify-center items-center'>
      <div className='container bg-white w-96 p-8 rounded-lg shadow-lg'>
        <h2 className='title text-3xl font-bold mb-4 text-center text-gray-800'> Random Password Generator</h2>
        <div className="password-wrapper">
          <div className="password-area relative">
            <input type="text" value={password} disabled placeholder='Cannot generate password!' className='w-full px-3 py-4 border rounded-lg focus:outline-none focus:border-blue-500 text-lg font-semibold text-gray-800' />
            <img src={copyIcon} alt="copyicon" className='copyIcon absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer w-6 h-6' onClick={copyPassword} />
          </div>
        </div>
        <div className="setting mt-6">
          <h3 className='text-xl font-semibold mb-2 text-gray-800'>Customize your password</h3>
          <div className="customize">
            <div className="checkboxes flex">
              <div className="left">
                <div className="checkbox-field mb-4">
                  <input type="checkbox" name="lower" id="lower" checked={lowerCase} onChange={() => handleCheckbox('lowercase')} className='mr-2 cursor-pointer' />
                  <label htmlFor="lower" className='text-gray-800'>Include LowerCase(a-z)</label>
                </div>
                <div className="checkbox-field mb-4">
                  <input type="checkbox" name="upper" id="upper" checked={upperCase} onChange={() => handleCheckbox('uppercase')} className='mr-2 cursor-pointer' />
                  <label htmlFor="upper" className='text-gray-800'>Include UpperCase(A-Z)</label>
                </div>
              </div>
              <div className="right">
                <div className="checkbox-field mb-4">
                  <input type="checkbox" name="numbers" id="numbers" checked={numbers} onChange={() => handleCheckbox('numbers')} className='mr-2 cursor-pointer' />
                  <label htmlFor="numbers" className='text-gray-800'>Include Numbers(0-9)</label>
                </div>
                <div className="checkbox-field mb-4">
                  <input type="checkbox" name="symbols" id="symbols" checked={symbols} onChange={() => handleCheckbox('symbols')} className='mr-2 cursor-pointer' />
                  <label htmlFor="symbols" className='text-gray-800'>Include Symbols(&-#)</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="password-length mt-6">
          <h3 className='text-xl font-semibold mb-2 text-gray-800'>Password Length</h3>
          <div className="slider flex items-center">
            <p className="rangeValue w-16 text-xl font-semibold">{passwordLength}</p>
            <div className="range flex-grow">
              <input type="range" min={6} max={20} defaultValue={passwordLength} onChange={(event) => setPasswordLength(Number(event.currentTarget.value))} className='w-full' />
            </div>
          </div>
        </div>
        <div className="buttons flex justify-center mt-8">
          <Link to={`/pwd/get-all/${uid}`}>
            <button type='button' onClick={copyPassword} className='py-3 px-6 bg-blue-500 text-white rounded-md mr-4 cursor-pointer hover:bg-blue-600'>Vault</button>
          </Link>
          <button type='button' onClick={generatePassword} className='py-3 px-6 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600'>Generate Password</button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        style={{ top: '130px', right: '20px' }}
      />
    </div>
  );
}

export default PasswordGenerator;
