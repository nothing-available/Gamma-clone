type Props = {
  children: React.ReactNode;
};

function PresentationLayout(props: Props) {
  return (
    <div className="h-full w-full overflow-x-hidden">
      {props.children}
    </div>
  );
}

export default PresentationLayout;