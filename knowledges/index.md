---
kind: guide
status: active
canonical: knowledges/index.md
last_verified: 2026-10-08
---

# 지식 기반 문서 지도

`knowledges/`은 Uni Translator 개발 업무를 **어떻게 수행하고 운영하는지**를 설명하는 문서 공간이다.

기초 설계, 설계 결정은 [설계 문서 지도](architecture/index.md)에서 찾는다.
세부 작업 상황별 가이드라인은 [매뉴얼 문서 지도](manual/index.md)에서 찾는다.

## 먼저 읽을 문서

| 상황 | 권위 문서 | 보조 문서 |
| --- | --- | --- |
| 에이전트 작업 시작 전 | [에이전트 작업 프로토콜](manual/agent_task_protocol.md) | - |
| 문서 작업, Git 브랜치·커밋·푸시 | [문서 및 Git 워크플로우](manual/docs_and_git_workflow.md) | - |

## 문서 경계

- `architecture/`: 아키텍쳐, 설계 결정, 이슈 조사 근거
- `architecture/investigations/`: 특정 이슈의 가설·실험·관찰을 보존한다. 미확정 또는 기각 결론을 포함할 수 있으며
  반복 작업의 지침이나 장기 계약의 권위 문서는 아니다.
- `manual/`: 사람이 반복 수행하는 절차, 명령, 검증, 배포, 운영 규칙
- `plans/`: 실제 작업 수행 계획, 과거 작업 기록
- `plans/archives`: 수행을 완료한 작업을 보존한다. 이후 다른 작업에서 프로젝트의 진행 맥락을 파악하는 데 사용한다.
- `troubleshootings/`: 재현 가능한 증상, 확정 원인, 적용 가능한 대응과 검증 방법을 보존한다. 이후 작업의
  사전 점검 자료로 사용한다.

조사 또는 트러블슈팅에서 장기 계약·스펙 정정·운영 절차가 확정되면 각각의 canonical 문서에 반영하고, 원 문서는 근거 링크로 남긴다.

## 문서 역할과 생명주기

문서의 역할과 생명주기를 한 `상태` 값으로 섞지 않는다. 메타 블록을 추가하거나 갱신할 때는 아래 값을 사용한다.

| 필드 | 허용 값 | 의미 |
| --- | --- | --- |
| `kind` | `canonical`, `guide`, `reference`, `investigation`, `decision`, `snapshot`, `memory` | 문서가 수행하는 역할 |
| `status` | `active`, `historical`, `superseded` | 현재 사용 가능성 |
| `canonical` | 저장소 상대 경로 | 더 상세한 문서가 따르는 권위 문서 |
| `last_verified` | `YYYY-MM-DD` | 사실 또는 절차를 마지막으로 확인한 날짜 |

`knowledges/`의 모든 Markdown 문서는 이 메타로 분류한다. 현행 절차와 API는 `active`, 작성 당시의
방법론·브랜딩·피드백 원문은 `historical`, 이동 안내 문서는 `superseded`로 구분한다. 대규모 문서 이동이나
정보구조 변경 시에는 반드시 누락과 잘못된 canonical 경로를 확인한다.

## 링크와 이동 규칙

저장소 내부 링크는 이동 작업에서 모두 새 경로로 갱신하며, redirect stub은 GitHub 이슈·PR 같은
외부 이력에서 자주 참조되는 문서만 유지한다. 일반 Markdown 추가나 본문 수정은 자동 CI를 실행하지 않는다.