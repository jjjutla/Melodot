; ModuleID = 'probe15.3e78b95b64e29-cgu.0'
source_filename = "probe15.3e78b95b64e29-cgu.0"
target datalayout = "e-m:o-i64:64-i128:128-n32:64-S128"
target triple = "arm64-apple-macosx11.0.0"

; probe15::probe
; Function Attrs: uwtable
define void @_ZN7probe155probe17h47ba4ad55728d276E() unnamed_addr #0 {
start:
  ret void
}

attributes #0 = { uwtable "frame-pointer"="non-leaf" "probe-stack"="inline-asm" "target-cpu"="apple-m1" }

!llvm.module.flags = !{!0}
!llvm.ident = !{!1}

!0 = !{i32 8, !"PIC Level", i32 2}
!1 = !{!"rustc version 1.81.0-nightly (9c3bc805d 2024-06-27)"}
