const closest = (arr: number[], goal: number) =>
    arr.reduce((prev, curr) =>
      Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
    );
  export const getBinaryTree = (
    bars: number,
    partialSections: number[],
    sections: number[],
    lastBar: number = 0,
    level = 0
  ): any => {
    let middleBar = bars / 2; // 76
    let newLastBar = lastBar;
    if (partialSections.length > 1) {
      middleBar = closest(sections, middleBar + lastBar) - lastBar;
    } else {
      newLastBar = 0;
    }
    const sliceIdx = partialSections.indexOf(middleBar + lastBar);
    const firstHalf =
      sliceIdx !== -1 ? partialSections.slice(0, sliceIdx + 1) : [];
    const secondHalf = sliceIdx !== -1 ? partialSections.slice(sliceIdx + 1) : [];
  
    const secondBar = bars - middleBar;
    if (middleBar < 0.25) {
      return {
        bars,
        id: Math.random().toString(),
        attributes: { beats: bars * 4, sections: [] },
      };
    }
    const attributes = {
      beats: bars * 4,
      sections: partialSections,
    };
    
    return {
      bars,
      id: Math.random().toString(),
      attributes,
      children: [
        getBinaryTree(middleBar, firstHalf, sections, newLastBar, level + 1),
        getBinaryTree(
          secondBar,
          secondHalf,
          sections,
          middleBar + lastBar,
          level + 1
        ),
      ],
    };
  };