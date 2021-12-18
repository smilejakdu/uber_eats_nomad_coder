module.exports =  {
    parser:  '@typescript-eslint/parser',  
    extends:  [
      'plugin:react/recommended', // 리액트 추천 룰셋
      'plugin:@typescript-eslint/recommended', // 타입스크립트 추천 룰셋
       // eslint의 typescript 포매팅 기능을 제거(eslint-config-prettier)
      'prettier/@typescript-eslint',  
      // eslint의 포매팅 기능을 prettier로 사용함. 항상 마지막에 세팅 되어야 함.            
      'plugin:prettier/recommended'
    ],
    root : true , 
    env : {
      node : true,
      jest : true,
    },
    parserOptions:  {
      ecmaVersion:  2018,  // 최신 문법 지원
      sourceType:  'module',  // 모듈 시스템 사용시
      ecmaFeatures:  {
          jsx:  true  // 리액트의 JSX 파싱을 위해서
      },
    },
    rules:  {
      // extends에서 적용한 룰셋을 덮어씌울 수 있습니다.
      // "@typescript-eslint/explicit-function-return-type": "off",
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'semi-spacing': ['error', {
        'before': false,
        'after': true,
      }],
      'max-len': ["error", { 'code': 300 }],
    },
    settings:  {
      react:  {
        version:  'detect' // eslint-plugin-react가 자동 리액트버전탐지
      },
    }
  };