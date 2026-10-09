# Uni Translator 에이전트 작업 지침
이 파일은 저장소 안에서 재현 가능한 작업 부트스트랩이다. 세부 절차는 아래 권위 문서를 우선한다.
> **에이전트 진입점**: Uni Translator 개발 업무를 수행하는 에이전트는 [지식 기반 인덱스](knowledges/index.md)에서 시작한다.

## 문서 로딩 순서

1. `knowledges/index.md` 참조
2. 작업 성격에 맞는 `knowledges/manual/index.md`, `knowledges/architecture/index.md` 항목 참조
3. 개발·문서·Git 작업은 `knowledges/manual/docs_and_git_workflow.md` 참조

※ 더 구체적인 문서가 이 요약과 다르다면 그 문서를 따른다.

## 공통 원칙

- 구현 전에 관련 이슈, 기존 계획·보고서·트러블슈팅을 확인한다.
- 사용자 또는 다른 도구가 만든 변경은 임의로 되돌리거나 삭제하지 않는다.
- 작업 브랜치는 최신 develop 브랜치를 기준으로 만든다.
- 작업 단계가 바뀌면 현재 단계의 변경을 커밋한 뒤 다음 단계 문서를 시작한다.
- GitHub comment, remote push, PR 생성은 사용자 승인을 받은 뒤 수행한다.

## 검증 원칙

- 프로젝트 파일을 수정하는 작업은 완료 전 `.codex/hooks.json`에 정의된 Stop 훅을 통해 `pnpm run verify` 검증을 통과해야 한다.
- 재현 가능한 검증 실패가 발생한 경우 작업을 완료했다고 주장하지 말고, 사용자에게 해당 실패 내용을 구체적을 보고한다.
- 하네스를 실행하기 전 문서 간의 모순, 문서 반영 상태, 수정된 코드의 역할/맥락 설명을 검토해야 한다.
- 최종 응답에 실행된 검증 결과와 남아 있는 실패/미검증 항목을 명시적으로 기재한다. 훅이 실행되지 않은 경우에는 검증이 완료된 것처럼 표현해서는 안 된다.
- 자세한 하네스 설정 및 실행 지침은 [하네스 규약](knowledges/manual/harness_contract.md)을 따른다.

## 프로젝트 구조

### 워크스페이스 규칙

- 이 프로젝트는 pnpm 워크스페이스로 관리되는 모노레포 프로젝트이다.
- 각 패키지는 `packages` 디렉토리에 고유 폴더를 가진다.

### 패키지

- `packages/frontend`: React 기반 Uni Translator 프론트엔드. 
- `packages/backend`: Uni Translator 백엔드.
- `packages/docs`: Uni Translator 제품 소개 및 문서 사이트.

### 명령어

저장소 루트 경로에서 다음 명령들을 실행한다.

- `pnpm run dev`: Uni Translator 패키지를 빌드하고 `http://localhost:3000`에서 Uni Translator 앱의 개발용 서버를 시작함.
- `pnpm run build`: Uni Translator 패키지를 빌드함.
- `pnpm run verify`: 저장소 계약을 검증하고 프로덕션 빌드를 실행함.
- `pnpm run build:docs`: 프로덕션용 Uni Translator docs 패키지를 빌드함. 
- `pnpm run format`: Prettier를 이용하여 저장소 내 모든 파일을 포맷팅함.
- `pnpm run lint`: OXLint를 이용하여 저장소 내 모든 파일을 린팅함.
- `pnpm run test`: pnpm 테스트 러너를 이용하여 모든 패키지의 테스트를 실행함.