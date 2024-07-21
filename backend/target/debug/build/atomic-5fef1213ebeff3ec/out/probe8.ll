; ModuleID = 'probe8.697a1497e211ec9f-cgu.0'
source_filename = "probe8.697a1497e211ec9f-cgu.0"
target datalayout = "e-m:o-i64:64-i128:128-n32:64-S128"
target triple = "arm64-apple-macosx11.0.0"

; probe8::probe
; Function Attrs: uwtable
define void @_ZN6probe85probe17hf87a610dbb67a615E() unnamed_addr #0 {
start:
  ret void
}

attributes #0 = { uwtable "frame-pointer"="non-leaf" "probe-stack"="inline-asm" "target-cpu"="apple-m1" }

!llvm.module.flags = !{!0}
!llvm.ident = !{!1}

!0 = !{i32 8, !"PIC Level", i32 2}
!1 = !{!"rustc version 1.81.0-nightly (9c3bc805d 2024-06-27)"}
